import React from 'react'
import axios from 'axios'

class IsoForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:7501/api')
        .then(response => {
            console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error)
            this.setState({errorMsg: "Error retreiving data"})
        })
    }

    render() {
        const { posts, errorMsg } = this.state 

        return (
            <div>
                Postlist component
                {
                    posts.title 
                }
                {
                    errorMsg ? <div> {errorMsg} </div> : null 
                }
            </div>
        )
    }
}

export default IsoForm