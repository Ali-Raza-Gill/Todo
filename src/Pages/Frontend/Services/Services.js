import React from 'react'

export default function Services() {
  return (
    <div className="container">
        <div className="row">
            <div className="col">
                <h1 className="text-center">Services </h1>
                <div className="row my-2 ">
                <div className="col d-flex justify-content-between align-items-center">
                  <div className="privacy ">
                    <input type="checkbox" className='mt-2'/>
                    <span > Remember me</span>
                  </div>
                  <h6 className='text-primary mt-2'>Forgot Password?</h6>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
