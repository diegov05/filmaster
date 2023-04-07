import React, { FC, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'

import "./StarRating.css"

interface Props {
    size: string
    id: string
    initialValue: number
}

export const StarRating: FC<Props> = (props) => {

    return (
        <div>
            <div className="container">
                <div className="star-widget" dir="rtl">
                    <form action="" className='star-widget'>
                        <input type="radio" name="rate" id={`rate-1-${props?.id}`} />
                        <label htmlFor={`rate-1-${props?.id}`}>


                            {props.initialValue > 9
                                ? <StarIcon
                                    style={{
                                        color: "transparent",
                                        fill: "var(--dark-purple-color)"
                                    }}
                                    className={`
                                     custom__icon
                                     star 
                                     ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`}
                                />
                                :
                                <StarIcon
                                    className={`
                                    custom__icon 
                                    star 
                                    ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`} />}


                        </label>



                        <input type="radio" name="rate" id={`rate-2-${props?.id}`} />
                        <label htmlFor={`rate-2-${props?.id}`}>

                            {props.initialValue
                                > 7
                                ? <StarIcon
                                    style={{
                                        color: "transparent",
                                        fill: "var(--dark-purple-color)"
                                    }}
                                    className={`
                                            custom__icon
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`}
                                />
                                :
                                <StarIcon
                                    className={`
                                            custom__icon 
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`} />}
                        </label>
                        <input type="radio" name="rate" id={`rate-3-${props?.id}`} />
                        <label htmlFor={`rate-3-${props?.id}`}>

                            {props.initialValue
                                > 5
                                ? <StarIcon
                                    style={{
                                        color: "transparent",
                                        fill: "var(--dark-purple-color)"
                                    }}
                                    className={`
                                    custom__icon
                                    star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`}
                                />
                                :
                                <StarIcon
                                    className={`
                                            custom__icon 
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`} />}
                        </label>
                        <input type="radio" name="rate" id={`rate-4-${props?.id}`} />
                        <label htmlFor={`rate-4-${props?.id}`}>

                            {props.initialValue
                                > 3
                                ? <StarIcon
                                    style={{
                                        color: "transparent",
                                        fill: "var(--dark-purple-color)"
                                    }}
                                    className={`
                                            custom__icon
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`}
                                />
                                :
                                <StarIcon
                                    className={`
                                            custom__icon 
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`} />}
                        </label>
                        <input type="radio" name="rate" id={`rate-5-${props?.id}`} />
                        <label htmlFor={`rate-5-${props?.id}`}>

                            {props.initialValue
                                > 1
                                ? <StarIcon
                                    style={{
                                        color: "transparent",
                                        fill: "var(--dark-purple-color)"
                                    }}
                                    className={`
                                            custom__icon
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`}
                                />
                                :
                                <StarIcon
                                    className={`
                                            custom__icon 
                                            star 
                                            ${props.size === "xl" ? "w-8 h-8"
                                            : props.size === "xs" ? "w-4 h-4" : "w-3 h-3"}`} />}
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}
