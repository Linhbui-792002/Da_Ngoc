import React from 'react'
import SoilLayer from '../SoilLayer'
import PileForm from '../Pile'

const HomePage = () => {
  return (
    <div className="container">
        <div className="mt-4 text-xl">Tính Toán SCT Cọc</div>
        <SoilLayer/>
        <PileForm/>
    </div>
  )
}

export default HomePage