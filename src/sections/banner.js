/** @jsx jsx */
import { jsx, Box, Container, Text } from "theme-ui";
import DonationForm from "components/donation-form";
import Image from "components/image";
import illustration from "assets/images/banner.png";

const Banner = () => {
  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.contentWrapper}>
          <DonationForm />
          <Box as="figure" sx={styles.illustration}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    // background: `linear-gradient(180deg, #F9FAFC 0%, rgba(249, 250, 252, 0) 100%)`,
    position: "relative",
    zIndex: 0,
    pt: [17, null, null, 19, 21, 23],
    pb: [8, null, null, 10, null, null, 10],
    minHeight: [null, null, null, null, null, "100vh"],
  },
  contentWrapper: {
    gap: [12, null, null, 14, 12],
    display: "grid",
    gridTemplateColumns: ["1fr", null, null, null, "385px 1fr", "470px 1fr"],
    alignItems: "flex-start",
  },
  illustration: {
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0px 24px 50px rgba(54, 91, 125, 0.05)',
    p: ['26px', null, null, '35px 40px 50px'],
  },
};
