import React from 'react'
import DateChip from './DateChip'

const SubmissionCalendar = () => {

    let arr = []
    for(var i=0;i<366/2;i++){
        arr.push(i)
    }

    return (
        <div>
            SubmissionCalendar
            <div className='grid grid-rows-6 grid-flow-col gap-1'>
                {arr.map(value => (
                    <div className='flex-none'>
                        <DateChip />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubmissionCalendar