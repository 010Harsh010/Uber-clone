import React from 'react';
import { useSelector } from "react-redux";
import { convertDistance ,convertTime} from '../utils/Conversion';
function CaptionDetails(props) {
  const captain = useSelector((state) => state.captain.currentCaptain);
  return (
    <div>
      <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/6EDE/production/_132928382_gettyimages-2071909768.jpg" alt="" />
            <h4 className='text-lg font-medium capitalize'>{captain.firstname + " " + captain.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹ {Number(props.captionstats?.totalEarn)}</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='mt-6 flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-start'> 
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>{convertDistance(Number(props.captionstats?.totalDistance))} Km</h5>
          <p className='text-sm text-gray-600'>Distance travel</p>
          </div>
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'>{String(convertTime(Number(props.captionstats?.totalTime)))}</h5>
          <p className='text-sm text-gray-600'>Hours works</p>
          </div>
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className='text-lg font-medium'>{String(Number(props.captionstats?.totalRides))}</h5>
          <p className='text-sm text-gray-600'>Total rides</p>
          </div>
        </div>
    </div>
  );
}

export default CaptionDetails;
