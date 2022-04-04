import React from 'react';
import {Container, Grid, Tooltip, Typography} from "@mui/material";
import packageJson from '../../../package.json';
import {styled} from '@mui/material/styles';

const FooterText = styled(Typography)`
  color: #fff;
  font-size: 1rem
`;

/**
 * Footer Component
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
    return (
        <Container maxWidth={false} sx={{
            minHeight: '10vh',
            textAlign: 'center',
            width: '100%',
            padding: '0.5em',
        }}>
            <Tooltip title={`ver ${packageJson.version}`} arrow>
                <Grid container>
                    <Grid item xs={12}>
                        <FooterText variant="body1">
                            Copyright © 2022 Robert Gordon University
                        </FooterText>
                    </Grid>
                    <Grid item xs={12}>
                        <FooterText variant="body1">
                            Vladimir Bardadom
                        </FooterText>
                    </Grid>
                </Grid>
            </Tooltip>
        </Container>
    )
}

export default Footer;