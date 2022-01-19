import React from 'react';
import {Container, Grid, Tooltip, Typography} from "@mui/material";
import packageJson from '../../../package.json';
import { styled } from '@mui/material/styles';

/**
 * Custom styled component
 * @type {StyledComponent<PropsOf<OverridableComponent<TypographyTypeMap>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
const FooterText = styled(Typography)`
    color:#fff
`;

/**
 * Footer Component
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
    return(
        <Container maxWidth={false} sx={{
            textAlign:'center',
            position:'absolute',
            bottom:0,
            left:0,
            right:0,
            width: '100vw !important',
            padding:'0.5em',
            backgroundColor:'rgba(0,0,0,0.06)'
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