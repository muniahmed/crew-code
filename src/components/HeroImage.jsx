import Tilt from "react-parallax-tilt";
import { Image, Box } from "@chakra-ui/react";
import EditorScreenshot from "../assets/EditorScreenshot.png";
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";

const HeroImage = () => {
  return (
    <Box position="relative" width="100%" height="350px">
      <Tilt
        tiltReverse={true}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.2}
        perspective={1000}
        style={{
          transformStyle: "preserve-3d", // Enable 3D perspective
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={EditorScreenshot}
          alt="Editor Screenshot"
          objectFit="cover"
          borderRadius="20px"
          width="100%"
          height="100%"
          zIndex="0"
        />

        <Box
          position="absolute"
          top="-10%"
          left="-3%"
          zIndex="1"
          style={{
            transform: "translateZ(60px)", // Pushes the image forward in 3D space
          }}
        >
          <Image src={person1} />
        </Box>
        <Box
          position="absolute"
          top="32%"
          right="-5%"
          zIndex="1"
          style={{
            transform: "translateZ(60px)", // Pushes the image forward in 3D space
          }}
        >
          <Image src={person2} />
        </Box>
        <Box
          position="absolute"
          bottom="-5%"
          zIndex="1"
          style={{
            transform: "translateZ(60px)",
          }}
        >
          <Image src={person3} />
        </Box>
      </Tilt>
    </Box>
  );
};

export default HeroImage;
