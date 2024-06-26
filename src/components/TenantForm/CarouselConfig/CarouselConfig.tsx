import React, { ChangeEvent } from 'react';
import { Fab } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { addBannerImages } from '../../../redux/slice/TenantRoomSlice'; // Assuming your slice is located here
import { FormattedMessage } from 'react-intl';

export default function CarouselConfig() {
  const { bannerImages } = useSelector((state: RootState) => state.tenantRoomList); // Adjust the selector according to your slice name
  const dispatch = useDispatch();

  const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files)
      dispatch(addBannerImages(Array.from(files))); 
  };

  console.log(bannerImages, "A");

  return (
    <div className="banner" data-testid="banner">
      <p className="banner-txt"><FormattedMessage id="app.BannerImg" defaultMessage="Banner Image" /></p>
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo-banner"
          type="file"
          className="banner-input"
          data-testid="banner-input"
          multiple  // Allow multiple file selection
          onChange={handleFileChange} // Handle file selection
          accept='image/png, image/jpeg'
        />
        <Fab
          style={{
            backgroundColor: "#26266d",
            color: "white",
            width: "10rem",
            borderRadius: "4px",
          }}
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
          className="input-fab"
        >
          <i className="fi fi-br-plus" style={{ marginRight: '2px' }}></i> <FormattedMessage id="app.uploadPhoto" defaultMessage="Upload Photo" />
        </Fab>
      </label>
      {bannerImages.length > 0 && (
        <div>
          <p>Images Uploaded:</p>
          <ul>
          {bannerImages.length > 0 && (
        <div>
          <ul>
            {Array.from(bannerImages).map((image, index) => (
              <li key={index}>{image.name}</li>
            ))}
          </ul>
        </div>
      )}
          </ul>
        </div>
      )}
    </div>
  );
}
