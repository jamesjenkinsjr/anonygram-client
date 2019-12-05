import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './SubmissionForm.css';
import config from '../../config';

class SubmissionFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      nsfwDetected: false,
      loading: false,
    };
  }

  imageSelectHandler = e => {
    this.setState({
      image: e.target.files[0],
      nsfwDetected: false,
    });
  };

  imageDragHandler = file => {
    this.setState({
      image: file,
      nsfwDetected: false,
    });
  };

  onSubmitImageUploader = e => {
    e.preventDefault();

    //Start loading spinner
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('someImage', this.state.image);
    formData.set('latitude', this.props.userLocation.lat);
    formData.set('longitude', this.props.userLocation.long);
    for (var value of formData.values()) {
      console.log(value);
    }
    fetch(`${config.API_ENDPOINT}/api/images`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        //Remove loading spinner
        this.setState({ loading: false });
        this.props.updateNewContent();
        console.log(res.status);
        if (res.status === 400) {
          this.setState({ nsfwDetected: true });
        }
        this.setState({ image: null });
      })
      .catch(error => {
        console.error(error);
      });
  };

  resetState = () => {
    this.setState({ image: null });
  };

  render() {
    const { nsfwDetected } = this.state;

    return (
      <div>
        <section className="nsfw-detected">
          {nsfwDetected ? 'Sorry, that content is not permitted' : ''}
        </section>
        {/* 
          component utilizing hooks to detect dropped files 
          while users are on desktop applications
           */}
        <Dropzone onDrop={file => this.imageDragHandler(file[0])}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <form
              {...getRootProps()}
              className="SubmissionForm"
              encType="multipart/form-data"
              onSubmit={this.onSubmitImageUploader}
            >
              <input
                {...getInputProps()}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={this.imageSelectHandler}
                name="someImage"
                ref={imageInput => (this.imageInput = imageInput)}
              />
              {isDragActive ? (
                <p className="SubmissionForm__drag--active">Nice pic!</p>
              ) : (
                !this.state.image && (
                  <p className="SubmissionForm__drag">
                    Drag a pic here to upload, or click to select one
                  </p>
                )
              )}
              {!this.state.image ? (
                !isDragActive && (
                  <button
                    type="button"
                    className="SubmissionForm__button"
                    onClick={() => this.imageInput.click()}
                  >
                    +
                  </button>
                )
              ) : (
                <>
                  <button
                    className="SubmissionForm__button"
                    type="reset"
                    onClick={() => this.resetState()}
                  >
                    Cancel
                  </button>
                  <button
                    className="SubmissionForm__button"
                    type="submit"
                    value="Upload"
                  >
                    Upload
                  </button>
                </>
              )}
            </form>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default SubmissionFrom;
