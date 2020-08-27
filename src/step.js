import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import { Input, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Axios from 'axios'
import $ from 'jquery'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
//     backButton: {
//         marginRight: theme.spacing(1),
//     },
//     instructions: {
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(1),
//     },
// }));

export default class HorizontalLabelPositionBelowStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            b_validate: false,
            t_message: ""

        }
        this.steps = ['Step 1', 'Step 2', 'Result'];
        this.BASE_URL = "https://8gfcuh9717.execute-api.eu-west-1.amazonaws.com/rekon/rekon"
        // this.proxyurl = "https://cors-anywhere.herokuapp.com/"
    }

    handleNext = () => {
        if (this.state.activeStep === 0) this.submit_1()

        else if (this.state.activeStep === 1) console.log("step 2 clicked")

        else this.setState({ activeStep: this.state.activeStep + 1 })

    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    handleReset = () => {
        this.setState({ activeStep: 0 })
    };

    formatDate = (date) => {
        return date.split("-").reverse().join("-")
    }

    submit_1 = () => {
        if ($("#phone").val() === "" || $("#id").val() === "" || $("#birth").val() === "") {
            this.setState({ b_validate: true, t_message: "please fill all fields" })
            return
        }

        Axios({
            method: 'GET',
            url: this.BASE_URL,
            params: {
                msisdn: $("#phone").val(),
                birth: this.formatDate($("#birth").val()),
                id: $("#id").val()
            },
            withCredentials: true
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))

        // this.setState({ activeStep: this.state.activeStep + 1 })
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div className="step">
                    <Input id="phone" type="number" placeholder="phone" />
                    <Input id="id" placeholder="id" />
                    <Input id="birth" type="date"></Input>
                </div>;
            case 1:
                return 'second step formss';
            case 2:
                return 'validation result here...';
            default:
                return 'Unknown stepIndex';
        }
    }
    render() {
        return (
            <div className="container" >
                <Snackbar open={this.state.b_validate} autoHideDuration={2000} onClose={() => this.setState({ b_validate: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={() => this.setState({ b_validate: false })} severity="warning">{this.state.t_message}</Alert>
                </Snackbar>
                < Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {
                        this.steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper >
                <div>
                    {this.state.activeStep === this.steps.length ? (
                        <div style={{ padding: "0 15%", textAlign: 'center' }}>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div style={{ padding: "0 15%", textAlign: "center" }}>
                                <div >{this.getStepContent(this.state.activeStep)}</div>
                                <div>
                                    <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} > Back </Button>
                                    <Button variant="contained" color="primary" onClick={() => this.handleNext()}>
                                        {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div >
        );
    }

    // return(
    //     <div className = "container" >
    //     {/* <Snackbar open={this.state.b_validate} autoHideDuration={1500} onClose={() => this.setState({ b_validate: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    //             <Alert onClose={() => this.setState({ b_validate: false })} severity={this.state.serverity}>{this.state.t_message}</Alert>
    //         </Snackbar> */}
    //         < Stepper activeStep = { activeStep } alternativeLabel>
    //         {
    //             steps.map((label) => (
    //                 <Step key={label}>
    //                     <StepLabel>{label}</StepLabel>
    //                 </Step>
    //             ))
    //         }
    //         </Stepper >
    // <div>
    //     {activeStep === steps.length ? (
    //         <div style={{ padding: "0 15%", textAlign: 'center' }}>
    //             <Button onClick={handleReset}>Reset</Button>
    //         </div>
    //     ) : (
    //             <div style={{ padding: "0 15%", textAlign: "center" }}>
    //                 <div >{getStepContent(activeStep)}</div>
    //                 <div>
    //                     <Button disabled={activeStep === 0} onClick={handleBack}
    //                     // className={classes.backButton}
    //                     > Back </Button>
    //                     <Button variant="contained" color="primary" onClick={handleNext}>
    //                         {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
    //                     </Button>
    //                 </div>
    //             </div>
    //         )}
    // </div>
    //     </div >
    // );
}