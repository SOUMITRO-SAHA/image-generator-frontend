import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsCloudArrowDownFill, BsCloudArrowUpFill } from 'react-icons/bs';
import { Image, Layer, Stage, Text } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BiSolidDownArrow } from '../../assets';
import { fontFamilies } from '../../assets/data.demo';
import Button from '../../common/Button';
import { config } from '../../config';
import useSession from '../../hooks/session.hook';
import { toggleModal } from '../../redux/slices/auth.slice';
import { isEmpty } from '../../utils/isEmpty';

function Editor() {
  const [loading, setLoading] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(900);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [logos, setLogos] = useState([]);
  const [addText, setAddText] = useState(false);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(null);
  const [overlayTexts, setOverlayTexts] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1);
  const [newText, setNewText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState();
  const [fontStyle, setFontStyle] = useState('normal');
  const { user } = useSelector((state) => state.user);
  const { getSession } = useSession();
  const dispatch = useDispatch();

  // Image Functionalities:
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;

      img.onload = () => {
        if (type === 'background') {
          setBackgroundImage(img);
        } else if (type === 'logo') {
          setLogos([...logos, img]);
        }
      };
    };

    reader.readAsDataURL(file);
  };

  // Text Functionalities:
  const handleTextClick = (idx) => {
    // First Set the Selected Index
    setSelectedTextIndex(idx);
  };

  const handleAddText = () => {
    if (newText && fontSize) {
      setOverlayTexts([
        ...overlayTexts,
        {
          content: newText,
          fontSize: fontSize,
          fontFamily: fontFamily,
          color: selectedColor,
          fontStyle: fontStyle,
          x: 100,
          y: 100,
        },
      ]);
    }

    setNewText('');
    setFontSize(16);
    setAddText(!addText);
  };

  const handleTextChange = (content) => {
    if (selectedTextIndex === -1) {
      setNewText(content);
    } else if (selectedTextIndex >= 0) {
      const newTexts = [...overlayTexts];
      newTexts[selectedTextIndex].content = content;
      setOverlayTexts(newTexts);
    }
  };

  const handleFontSizeChange = (fontSize) => {
    if (selectedTextIndex === -1) {
      setFontSize(fontSize);
    } else if (selectedTextIndex >= 0) {
      const newTexts = [...overlayTexts];
      newTexts[selectedTextIndex].fontSize = fontSize;
      setOverlayTexts(newTexts);
    }
  };

  const handleFontFamilyChange = (fontFamily) => {
    const nextTexts = [...overlayTexts];
    nextTexts[selectedTextIndex].fontFamily = fontFamily;
    setOverlayTexts(nextTexts);
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;

    if (selectedTextIndex >= 0) {
      const newTexts = [...overlayTexts];
      newTexts[selectedTextIndex].color = selectedColor;
      setOverlayTexts(newTexts);
      setSelectedColor(selectedColor);
    }
  };

  const handleFontStyle = (e) => {
    const selectedFontStyle = e.target.value;
    const newTexts = [...overlayTexts];
    newTexts[selectedTextIndex].fontStyle = selectedFontStyle;
    setOverlayTexts(newTexts);
    setFontStyle(selectedFontStyle);
  };

  // Downloads:
  const handleDownload = () => {
    const stage = document.getElementsByTagName('canvas')[0];
    const dataURL = stage.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Image Upload on Database:
  const handleUpload = async () => {
    setLoading(true);
    try {
      if (isEmpty(user)) {
        // First Get the Session:
        await getSession();
      }

      const canvas = document.querySelector('canvas');
      const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve));

      // Create a FormData object and append the Blob
      const formData = new FormData();
      formData.append('url', imageBlob);

      const { data } = await axios.post(`${config.BASE_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (data.success) {
        toast.success(data.message);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Side Effects:
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 720) {
        setCanvasWidth(500);
        setCanvasHeight(400);
      } else if (screenWidth <= 1080) {
        setCanvasWidth(800);
        setCanvasHeight(600);
      } else if (screenWidth <= 1600) {
        setCanvasWidth(900);
        setCanvasHeight(600);
      } else {
        setCanvasWidth(1000);
        setCanvasHeight(800);
      }
    };

    // Add an event listener to handle resizing
    window.addEventListener('resize', handleResize);

    // Call handleResize on initial render
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {}, [selectedLogoIndex, selectedTextIndex, fontFamily]);

  return (
    <section className='m-8 p-3 grid grid-cols-12 gap-3 border overflow-x-hidden'>
      <div className='h-full w-full border col-span-3 3xl:col-span-2 overflow-y-auto'>
        {/* Background Images */}
        <div className='m-3 bg-slate-500 p-2 flex justify-center text-white rounded'>
          <label
            htmlFor='background-upload'
            className='text-center cursor-pointer'
          >
            Upload Background Image
          </label>
          <input
            type='file'
            id='background-upload'
            accept='image/*'
            className='hidden'
            onChange={(e) => handleImageUpload(e, 'background')}
          />
        </div>

        {/* Logo Images */}
        <div className='m-3 bg-slate-500 p-2 flex justify-center text-white rounded'>
          <label htmlFor='logo-upload' className='cursor-pointer'>
            Upload Logos
          </label>
          <input
            type='file'
            id='logo-upload'
            accept='image/*'
            className='hidden'
            onChange={(e) => handleImageUpload(e, 'logo')}
          />
        </div>

        {/* Text Input */}
        <div
          className='m-3 bg-slate-500 p-2 flex items-center gap-3 justify-center text-white rounded cursor-pointer select-none'
          onClick={() => {
            setSelectedTextIndex(-1);
            setAddText(!addText);
          }}
        >
          <span>Add Text</span>
          {addText && (
            <span>
              <BiSolidDownArrow />
            </span>
          )}
        </div>
        {addText && (
          <div className='m-3 mx-5 p-2 flex flex-col items-center gap-3 justify-center rounded bg-yellow-100'>
            <div className='w-full'>
              <label htmlFor='text-content'>Text Content:</label>
              <input
                type='text'
                id='text-content'
                value={newText}
                onChange={(e) => handleTextChange(e.target.value)}
                className='outline-none rounded h-8 border w-full'
              />
            </div>
            <div className='w-full'>
              <label htmlFor='font-size'>Font Size:</label>
              <input
                type='number'
                id='font-size'
                value={fontSize}
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                className='outline-none rounded h-8 border w-full'
              />
            </div>

            <button
              className='bg-slate-900 px-6 p-2 text-white rounded hover:bg-slate-700 focus:bg-slate-700'
              onClick={handleAddText}
            >
              Add
            </button>
          </div>
        )}

        {/* Properties Section */}
        <div className='m-3'>
          <div className='w-full h-[2px] mx-auto border-2  mt-8 mb-3 rounded-full' />
          <h3 className='text-xl font-bold text-center uppercase'>
            Properties
          </h3>

          {/* Update the Text Size Conditionally */}
          {/* Text Properties */}
          <div className='flex flex-col gap-5'>
            <div>
              {selectedTextIndex >= 0 && (
                <div className='p-2 py-3 flex flex-col items-center gap-3 rounded bg-slate-500 text-white w-full'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='text-content'>Text:</label>
                    <input
                      type='text'
                      id='text-content'
                      value={overlayTexts[selectedTextIndex]?.content}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className='w-full outline-none rounded h-8 border text-black'
                    />
                  </div>

                  <div className='flex flex-col w-full'>
                    <label htmlFor='font-size'>Font Size:</label>
                    <input
                      type='number'
                      id='font-size'
                      value={overlayTexts[selectedTextIndex]?.fontSize}
                      onChange={(e) =>
                        handleFontSizeChange(parseInt(e.target.value))
                      }
                      className='w-full outline-none rounded h-8 border text-black'
                    />
                  </div>

                  {/* Font Family */}
                  <div className='flex flex-col w-full'>
                    <label htmlFor='font-family'>Font Family:</label>
                    <div>
                      <select
                        className='w-full p-1 border text-gray-600 outline-none rounded'
                        value={fontFamily}
                        onChange={(e) => {
                          setFontFamily(e.target.value);
                          handleFontFamilyChange(e.target.value);
                        }}
                      >
                        {fontFamilies.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Font Style */}
                  <div className='w-full'>
                    <label htmlFor='font-style'>Font Style:</label>
                    <select
                      id='font-style'
                      className='w-full p-1 border text-gray-600 outline-none rounded'
                      value={fontStyle}
                      onChange={handleFontStyle}
                    >
                      <option value='normal'>Normal</option>
                      <option value='italic'>Italic</option>
                      <option value='bold'>Bold</option>
                    </select>
                  </div>

                  {/* Text Color */}
                  <div className='flex gap-5 justify-between items-center'>
                    <label htmlFor='text-color'>Text Color:</label>
                    <input
                      type='color'
                      id='text-color'
                      onChange={handleColorChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download + Save On Cloud Options */}
        <div className='m-3'>
          <div className='w-full h-[2px] mx-auto border-2  mt-8 mb-3 rounded-full' />
          <h3 className='text-xl font-bold text-center uppercase'>Downloads</h3>

          <div className='flex flex-col gap-5 my-6'>
            <Button
              text={loading ? 'Loading...' : 'Save On Cloud'}
              icon={<BsCloudArrowUpFill />}
              onClick={handleUpload}
              className='bg-green-500 h-14 3xl:h-10 hover:bg-green-400 justify-between'
            />
            <Button
              text={'Download'}
              icon={<BsCloudArrowDownFill />}
              onClick={handleDownload}
              className='bg-blue-500 h-14 3xl:h-10 hover:bg-blue-600 justify-between'
            />
          </div>
        </div>
      </div>

      <div className='col-span-9 3xl:col-span-10 flex items-center justify-center'>
        <Stage
          width={canvasWidth}
          height={canvasHeight}
          className='border rounded'
        >
          <Layer>
            {backgroundImage && (
              <Image image={backgroundImage} width={1100} height={750} />
            )}

            {logos.map((img, index) => (
              <Image
                key={index}
                image={img}
                width={150}
                height={150}
                x={100 * index}
                y={100 * index}
                draggable
                onClick={() => setSelectedLogoIndex(index)}
              />
            ))}

            {/* Text */}
            {overlayTexts.map((text, index) => (
              <Text
                key={index}
                text={text.content}
                fontSize={text.fontSize}
                fill={text.color}
                x={text.x}
                y={text.y}
                draggable
                onClick={() => handleTextClick(index)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </section>
  );
}

export default Editor;
