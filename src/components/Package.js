import React from 'react'
import calenderPic from '../images/calendar.png';
import pointPic from '../images/point.png';
import loader from '../images/loader.gif';
const Package = ({ packagesList,loading}) => {
    if (loading) {
        return (
            <div className="loader justify-content-center d-flex align-content-center">
                <img src={loader} alt="Loader"/>
            </div>
        )
    }
    return (
        <>
            {packagesList.map((singlePackage, index) => {
                return (
                    <div className="card packagelist"
                        key={index}>
                        <div className="card-body d-flex">
                            <div className="img-block" style={{ backgroundImage: `url(${singlePackage.thumbnail})` }}>

                                {singlePackage.discount !== null ? <h2><span>&#9733;</span>{singlePackage.discount['title']}</h2> : <h2 className='d-none'>No Discount</h2>}
                            </div>
                            <div className="content-block" >
                                <h2>{singlePackage.title}</h2>
                                <p className="card-text">{singlePackage.description}</p>
                                <ul>
                                    <li><span><img src={calenderPic} alt={singlePackage.durationText} /></span>{singlePackage.durationText}</li>
                                    <li><span><img src={pointPic} alt={singlePackage.durationText} /></span>{singlePackage.loyaltyPointText}</li>
                                </ul>
                            </div>
                        </div> <div className="card-footer-bottom d-flex justify-content-between align-content-center">
                            <div className="card-footer-left">
                                <h5>Includes:</h5>
                                <ul className="list-inline">
                                    {
                                        singlePackage.amenities.map((singleAmenities, index) => {
                                            return (
                                                <li className="d-inline-block" key={index}><img src={singleAmenities.icon} alt={singleAmenities.title} width="21" height="17" /></li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                            <div className="card-footer-right text-end">
                                <h5>Start From</h5>
                                <span>৳ {singlePackage.startingPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )

            })
            }
        </>
    )
}
export default Package