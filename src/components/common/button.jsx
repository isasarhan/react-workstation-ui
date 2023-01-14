import React from 'react'
import { Button } from '@mui/material';
import { myBackgroundColor } from '../../utilities/design/colors';

const DesignButton = ({ text, onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant="contained" sx={{ background: `${myBackgroundColor}` }}>{text}
        </Button>
    )
}

export default DesignButton
