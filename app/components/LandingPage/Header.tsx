/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import "../../node_modules/bootstrap/dist/css/bootstrap.css"

export default function Header() {
    return (
        <div className="Header">
            <div className="text">
                <div className="hd-title">
                    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, tempora!</h1>
                </div>
                <div className="hd-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolorem voluptatibus amet. Ducimus consectetur rerum fugit</p>
                </div>
                <div className="btns">
                    <div className="find-tenant-btn"><button>Find tenant</button></div>
                    <div className="find-flat-btn">
                        <Link href="/Offers">
                            <button>Find flat</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="vector-img-container">
                <Image src="/service1.png" alt="Budapest" layout="fill" />
            </div>
        </div>
    )
}
