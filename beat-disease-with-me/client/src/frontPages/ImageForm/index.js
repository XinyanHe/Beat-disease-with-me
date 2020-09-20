import React from "react";
import Button from "@material-ui/core/Button";

// Importing actions/required methods
import { addImage } from "../../actions/image";

import "./styles.css";

/* Component for the Image Form */
class ImageForm extends React.Component {

    state = {
        files: []
    }

    // handleSelect = (event) => {
    //     event.preventDefault()
    //     let new_array = this.state.files
    //     for (let j = 0; j < (event.target.files).length; j++) {
    //         new_array.push(event.target.files[j])
    //     }
    //     this.setState({
    //         files : new_array
    //     })
    //     const { dashboard } = this.props;
    //     dashboard.setState({
    //         selectedPic: this.state.files[0]
    //     })
    //     dashboard.setState({upload: true})
    //
    // }

    // handleUpload = (event) => {
    //     event.preventDefault()
    //     if (this.props.type === "profile picture") {
    //         addImage(event.target, dashboard, "image");
    //     } else {
    //         addImage(event.target, dashboard, "certificate");
    //     }
    //     const { dashboard } = this.props;
    //     if (dashboard.state.selectedPic == null){
    //         dashboard.message = "Please select an image first."
    //         dashboard.setState({emptyUpload: true})
    //         setTimeout( () => {
    //             dashboard.setState({emptyUpload: false})
    //         }, 3000)
    //     } else{
    //         dashboard.message = "Upload Succeed!"
    //         dashboard.setState({uploaded:true})
    //     }
    // }

    render() {
        const { dashboard } = this.props;
        const innerText = `Upload your ${this.props.type} below:`

        return (
            <React.Fragment>
                <form className="image-form" onSubmit={(event) =>{
                    event.preventDefault()
                    if (this.props.type === "profile picture") {
                        addImage(event.target, dashboard, "image");
                    } else {
                        addImage(event.target, dashboard, "certificate");
                    }
                    if (dashboard.state.selectedPic == null){
                        dashboard.message = "Please select an image first."
                        dashboard.setState({emptyUpload: true})
                        setTimeout( () => {
                            dashboard.setState({emptyUpload: false})
                        }, 3000)
                    } else{
                        dashboard.message = "Please wait until the image uploaded"
                        dashboard.setState({uploaded:true})
                    }
                }}>
                    <div className="image-form__field">
                        <label className="imglabel"> {innerText} </label>
                        <input className="imginput" name="image" type="file" onChange={(event) => {
                            event.preventDefault()
                            let new_array = this.state.files
                            for (let j = 0; j < (event.target.files).length; j++) {
                                new_array.push(event.target.files[j])
                            }
                            this.setState({
                                files : new_array
                            })
                            dashboard.setState({
                                selectedPic: this.state.files[0]
                            })
                            dashboard.setState({upload: true})
                        }}/>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="image-form__submit-button"
                        // onClick={this.handleUpload}
                    >
                        Upload
                    </Button>
                </form>

                {(this.props.type === "profile picture") ? (<p className={`image-form__message--${dashboard.state.message1.type}`}
                >{dashboard.state.message1.body}</p>) : (<p className={`image-form__message--${dashboard.state.message2.type}`}
                >{dashboard.state.message2.body}</p>)}
            </React.Fragment>
        );
    }
}

export default ImageForm;
