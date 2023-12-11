import React from 'react'

export const PhoneNumber = ({ phoneNumber }) => {
    const filterPhoneNumber = phoneNumber.filter(el => el !== null).flat()

    return (
                filterPhoneNumber.map((el,idx) => {
                        return (
                                <div className="d-flex align-items-center flex-wrap justify-content-center gap-2" key={idx}>
                                        <span className="p-2">
                            <a className="text-decor-none d-flex flex-wrap align-items-center flex-wrap justify-content-center"
                               href={'tel:' + el}>&nbsp;{el}
                                &nbsp;<i className="bi bi-telephone-fill text-yellow btn-phone ms-2 fs-2"/>
                            </a>
                            </span>
                                </div>
                        )
                })
    )
}

