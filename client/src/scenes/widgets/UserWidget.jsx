import React, {useEffect, useState} from 'react';
import { ManageAccountsOutlined, EditOutlined, WorkOutlined, LocationOnOutlined } from '@mui/icons-material';
import {Box, Typography, Divider, useTheme} from '@mui/material';
import UserImage from 'components/UserImage';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main =  palette.neutral.main;

    const getuser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET", 
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getuser();
    }, [])

    if(!user) return null;

    const {firstName, lastName, location, occupation, viewdProfile, impressions, friends} = user;
    console.log('pic', picturePath)

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
                <FlexBetween>
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography variant="h4" color={dark} fontWeight="600" sx={{"&:hover": {color: palette.primary.light, cursor: "pointer"}}}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

                <Divider />

                {/* SECOND ROW */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <WorkOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>

                <Divider />

                {/* THIRD ROW */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.rem">
                        <Typography color={medium}>Who's viewd your profile</Typography>
                        <Typography color={main} fontWeight="500">{viewdProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>Impressions</Typography>
                        <Typography color={main} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                </Box>

                <Divider />

                {/* FOURTH ROW */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" fontWeight="500" color={main} mb="1rem">
                        Scocial Profiles
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src={"../assets/twitter.png"} alt="twitter" />
                            <Box>
                                <Typography color={main} fontWeight="500">Twitter</Typography>
                                <Typography color={medium} fontWeight="500">Social Networks</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <img src={"../assets/linkedIn.png"} alt="linkedIn"/>
                            <Box>
                                <Typography color={main} fontWeight="500">LinkedIn</Typography>
                                <Typography color={medium} fontWeight="500">Network Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>
                </Box>
           
        </WidgetWrapper>
    )
}

export default UserWidget