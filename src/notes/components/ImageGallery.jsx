import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGallery = ({ images = [] }) => {
  const matches = useMediaQuery("(min-width:1024px)");

  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        overflowY: "scroll",
        scrollbarWidth: "2px",
      }}
    >
      <ImageList variant="masonry" gap={8} cols={matches ? 3 : 2}>
        {images.map((imageUrl) => (
          <ImageListItem key={imageUrl}>
            <img
              src={`${imageUrl}`}
              srcSet={`${imageUrl}`}
              alt="note image"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
