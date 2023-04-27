import { Box } from "@mui/material";

const UserImage = ({image, size = "60px"}) => {
    console.log('pic in com', image)
    return (
        <Box width={size} height={size}>
            <img src={`http://localhost:3001/${image}`} style={{ objectFit: "cover", borderRadius: "50%" }} width={size} height={size} alt="user" />
        </Box>
    )
}

export default UserImage;