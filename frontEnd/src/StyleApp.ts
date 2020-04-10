import Grid from '@material-ui/core/Grid';
import { Theme, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const styles = (theme: Theme) => ({
  "@global": {
    '::-webkit-scrollbar': {
      width: '7px',
      background: theme.palette.secondary.main
    },
    '::-webkit-scrollbar-track': {
      background: theme.palette.background.default
    },
    '::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.main
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.primary.dark
    }
  }
});

export const CustomTheme = withStyles(styles)(() => null);

/**
 * @param pt Padding Top
 */
export const Container = styled(Grid)`
    width: 100%;
    padding: 70px 70px 20px 70px;

    @media only screen and (max-width: 600px){
        padding: 74px 10px 20px 10px;
        ${(p: { pt?: number }) => `padding-top: ${p.pt || 0}px;`}; 
    }

    ${(p: { pt?: number }) => `padding-top: ${p.pt || 0}px;`};
`;