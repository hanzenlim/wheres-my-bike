import React from 'react';
import styled from 'styled-components';
import { space, layout, typography, color } from 'styled-system';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';

const cssProps = [
    'border',
    'borderBottom',
    'borderTop',
    'borderLeft',
    'borderRight',
    'borderRadius',
    'backgroundColor',
    'background',
    'color',
    'display',
    'textAlign',
    'height',
    'maxWidth',
    'minWidth',
    'minHeight',
    'maxHeight',
    'justifyContent',
    'flexDirection',
    'textTransform',
    'alignItems',
    'overflowY',
    'overflowX',
    'padding',
    'fontFamily',
    'lineHeight',
    'verticalAlign',
    'zIndex',
    'cursor',
    'lineHeight',
    'boxSizing',
    'flex',
    'boxShadow',
    'position',
    'top',
    'bottom',
    'left',
    'right',
];

// Add styled-system functions to your component
const Box = styled.div`
  ${space}
  ${layout}
  ${typography}
  ${color}
`;

const Div = ({ children, className, ...rest }) => {
    const styleProps = _pick(rest, cssProps);
    const restProps = _omit(rest, cssProps);

    return (
        <Box className={className} style={styleProps} {...restProps}>
            {children}
        </Box>
    );
};

export default Div;
