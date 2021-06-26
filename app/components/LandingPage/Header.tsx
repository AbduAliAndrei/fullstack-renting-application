// import '../styles/App.css'
import React, { useEffect, useRef } from 'react'
import styles from '../styles/sass/_header.scss'
import Link from 'next/link'
import Image from 'next/image'
// import "../../node_modules/bootstrap/dist/css/bootstrap.css"
export default function Header() {


    const image = "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80"
    const image2 = "https://images.unsplash.com/photo-1520986840182-5b15f734c85c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=757&q=80"

    let test = useRef('<div></div>')
    let currentImageCounter = 0;


    useEffect(() => {
        let slideshowImages = test.current.getElementsByClassName('img');
        slideshowImages[currentImageCounter].style.opacity = 1;
        setInterval(() => {
            slideshowImages[currentImageCounter].style.opacity = 0;
            currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
            slideshowImages[currentImageCounter].style.opacity = 1;
        }, 3500);
    }, [])

    return (

        <div className="Header">
            <div ref={test} className="image-slider">
                <div className="img">
                    <Image src={image} alt="Budapest" layout='fill' objectFit="cover" />
                </div>
                <div className="img">
                    <Image src={image2} alt="Budapest" layout='fill' objectFit="cover" />
                </div>
            </div>
            <div className="try">
                <div className="title">
                    <h1>Let’s find you the best apartment
                        in Budapest</h1>
                </div>
                <div className="available-offers">
                    <button> <Link href="/Offers"><a>Available  Offers</a></Link></button>
                </div>
            </div>
        </div>
    )

}
