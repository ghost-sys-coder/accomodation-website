import React, { useState } from 'react';
import { BsUpload } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Image } from "../../components/index";
import axios from 'axios';

const PhotoUploader = ({addedPhotos, setAddedPhotos}) => {
    const [photoLink, setPhotoLink] = useState("");

    /**
     * ! upload images by link
     */
    const imageLinkUpload = async (event) => {
        event.preventDefault();

        const {data:filename} = await axios.post("/api/linkuploads", {
            link: photoLink
        })

        setAddedPhotos((prev) => {
            return [...prev, filename]
        });

        setPhotoLink("");
    }

    const fileUpload = (event) => {
        event.preventDefault();
        const files = event.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i])
        }

        axios.post("/api/fileupload/file", data, {
            headers: {"Content-Type": "multipart/form-data"}
        }).then(response => {
            const { data:filenames } = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames]
            });
        })

    }

      /**
   * ! Delete photo with the trash icon
   */
  const handleRemovePhoto = async (filename) => {
    setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)])
  }
  
  /**
   * ! Make any of the images the main image
   */
    const handleSelectMainImage = (filename) => {
        const addedPhotosWithoutSelected = [...addedPhotos.filter(photo => photo !== filename)];
        const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
        setAddedPhotos(newAddedPhotos);
    }
    
  return (
    <>
    <label htmlFor="photos" className="form--label">photos</label>
    <p className="title-desc">more = better</p>
    <div className="add--link">
        <input
            type="text"
            placeholder='paste a link to an image...jpg'
            value={photoLink}
            onChange={event => setPhotoLink(event.target.value)}
        />
        <button type='submit' onClick={imageLinkUpload}>add photo</button>
    </div>
                      
    <label onChange={fileUpload} className='add-btn'>
        <input
            type="file"
            name="files"
            id="file"
            className='hide'
            multiple
        />
        <BsUpload />
        Upload
    </label>
                      
    <div className="image--grid">
        {addedPhotos.length > 0 && addedPhotos.map((imageLink, index) => (
            <div key={index} className="image">
                <Image
                    loading='lazy'
                    // src={"http://localhost:5000/uploads/" + imageLink}
                    src={imageLink}
                />

                <button className="star" onClick={(event) => {
                    event.preventDefault();
                    handleSelectMainImage(imageLink)
                }}>
                    {imageLink === addedPhotos[0] && (
                        <AiFillStar />
                    )}
                    {imageLink !== addedPhotos[0] && (
                        <AiOutlineStar />
                    )}
                </button>
                <button onClick={(event) => {
                    event.preventDefault();
                    handleRemovePhoto(imageLink)
                }} className="icon">
                  <FaTrash />
                </button>
            </div>
        ))} 
    </div>    
    </>
  )
}

export default PhotoUploader