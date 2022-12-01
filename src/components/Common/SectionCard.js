import React from 'react';

const SectionCard = (props) => {
    return (
        <div>
            {/* <Grid item md={2}> */}
                <div className='dFlex cp' style={{ background: '#CDD4D2', flexDirection: 'column', padding: '1rem', borderRadius: '0.4rem', height: '8rem', justifyContent: 'center' }}>
                    <div style={{ background: '#E7EAE9', padding: '2rem', borderRadius: '50%' }}>{props.data.icon}</div>
                    <div style={{ marginTop: '1rem' }}>{props.data.name}</div>
                </div>
            {/* </Grid> */}
        </div>
    )
}

export default SectionCard