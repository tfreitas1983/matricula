import React, { Component } from 'react'
import doc1 from  "../images/doc1.jpeg"
import doc2 from  "../images/doc2.jpeg"

export default class Documentos extends Component {
    constructor(props) {
        super(props)

        this.buscaAluno = this.buscaAluno.bind(this)
        
        this.state = {
        }
    }

    render() {
        return(
            <div style={{display: 'grid', justifyContent: 'center'}}>
                <img src={doc1} alt="Documentação 1" />
                <img src={doc2} alt="Documentação 2" />
            </div>
        )
    }





}