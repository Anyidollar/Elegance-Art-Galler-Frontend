import React from 'react'
import { AGallery, GridCol, GridGap1, GridGap2 } from '../../App.styles';
import Art1 from '../../assets/GalleryImages/Art1.jpeg'
import Art2 from '../../assets/GalleryImages/Art2.jpeg'
import Art3 from '../../assets/GalleryImages/Art3.jpeg'
import Art4 from '../../assets/GalleryImages/Art4.jpeg'
import Art5 from '../../assets/GalleryImages/Art5.jpeg'
import Art6 from '../../assets/GalleryImages/Art6.jpeg'
import Art7 from '../../assets/GalleryImages/Art7.jpeg'



const Gallery = () => {
    return (
        <>
            <AGallery > 
                <h2>Gallery</h2>
                <GridCol >
                    <GridGap1 >
                        <div>
                            <img src={Art1} alt="" />
                        </div>
                        <div>
                            <img id="iid" src={Art2} alt="" />
                        </div>
                    </GridGap1>
                    <GridGap2 >
                        <div>
                            <img src={Art3} alt="" />
                        </div>
                        <div>
                            <img src={Art4} alt="" />
                        </div>
                        
                    </GridGap2>
                    <GridGap1>
                        <div>
                            <img src={Art5} alt="" />
                        </div>
                        <div>
                            <img src={Art6} alt="" />
                        </div>
                        <div>
                            <img src={Art7} alt="" />
                        </div>
                    </GridGap1>
                </GridCol>
                  <button id='but'>View Full Gallery</button>
            </AGallery>
        </>
    )
}

export default Gallery