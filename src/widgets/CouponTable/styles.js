import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Table, Button as AntButton, Input as AntInput, Select as AntSelect, DatePicker as AntDatePicker, Modal as AntModal } from 'antd';
import { darken } from 'polished';

const primaryColor = '#1890ff'; // Primary color
const widgetColor = '#f0f2f5'; // Widget color
const inputBorderColor = '#d9d9d9'; // Input border color
const textColor = '#000'; // Text color

const StyledTable = styled(Table)`
  margin-bottom: 26px;
  flex-grow: 1;
  
  .ant-table-thead {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      opacity: .6;
      background: var(--input-border);
    }

    .ant-table-cell {
      background: var(--widget) !important;
      padding: 30px 26px 24px !important;
      border: none !important;
    }
  }
  
  .ant-table-tbody {
    tr:nth-child(odd) .ant-table-cell {
      background: ${theme('theme', {
        light: 'var(--body)',
        dark: 'rgba(39, 50, 65, .2)'
      })} !important;
    }
    
    tr:nth-child(even) .ant-table-cell {
      background: var(--widget) !important;
    }
    
    .ant-table-cell {
      border: none;
      padding: 24px 26px 26px;
    }
  }
  
  /* DatePicker Custom Styling */
  .ant-picker-dropdown {
    .ant-picker-panel {
      background-color: var(--widget);
      border-color: var(--input-border);
    }
    
    .ant-picker-content th {
      color: var(--label-text);
    }

    .ant-picker-cell {
      &.ant-picker-cell-today .ant-picker-cell-inner {
        border-color: var(--primary);
      }

      &.ant-picker-cell-selected .ant-picker-cell-inner {
        background-color: var(--primary);
        color: var(--text-white);
      }
      
      .ant-picker-cell-inner {
        color: var(--text);
      }
    }

    /* Timepicker styling */
    .ant-picker-time-panel-column {
      .ant-picker-time-panel-cell {
        color: var(--text);
        
        &-selected {
          background-color: var(--primary);
          color: var(--text-white);
        }
      }
    }
    
    .ant-picker-footer .ant-picker-ok {
      background-color: var(--primary);
      color: var(--text-white);
      
      &:hover {
        background-color: ${darken(0.1, primaryColor)};
      }
    }
  }
`;

// Styled Button
// Styled Button
export const StyledButton = styled(AntButton)`
  background-color: ${primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  height: 54px;
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: ${darken(0.1, primaryColor)};
    color: #fff;
    transform: scale(1.01);
  }
  
  &:focus {
    background-color: ${darken(0.1, primaryColor)};
    color: #fff;
    border: none;
  }
`;

// Styled Modal
export const StyledModal = styled(AntModal)`
  .ant-modal-content {
    background: ${widgetColor};
    border-radius: 8px;
    width: 600px; /* Modal width */
    max-width: none;
  }

  .ant-modal-header {
    background: ${primaryColor};
    color: #fff;
    border-bottom: none;
    padding: 16px;    
    margin-top:28px;
  }

  .ant-modal-title {
    font-size: 18px;
    font-weight: bold;
  }

  .ant-modal-footer {
    border-top: 1px solid ${inputBorderColor};
    padding: 16px;
  }

 .ant-modal-footer .ant-btn-primary {
    background: ${primaryColor}; /* Same color as the title background */
    border-color: ${primaryColor}; /* Same color as the title background */
    color: #fff; /* Ensure the text color is readable */
    &:hover {
      background: ${primaryColor}; /* Maintain color on hover */
      border-color: ${primaryColor}; /* Maintain border color on hover */
    }
  }


`;

// Styled Input
export const StyledInput = styled(AntInput)`
  background: ${widgetColor};
  border: 1px solid ${inputBorderColor};
  color: ${textColor};
  margin-bottom: 20px; /* Bottom margin */
  margin-top: 20px; /* Bottom margin */
  width: 100%; /* Make the input width 100% */
  height: 54px; /* Ensure the height matches the select and date picker */
  padding: 16px; /* Padding for larger input fields */
  font-size: 16px; /* Font size */
  box-sizing: border-box; /* Include padding and border in width and height calculations */

  &:focus {
    border-color: ${primaryColor};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

// Styled Select
export const StyledSelect = styled(AntSelect)`
  .ant-select-selector {
    background: ${widgetColor};
    border: 1px solid ${inputBorderColor};
    color: ${textColor};
    margin-bottom: 20px; /* Bottom margin */
    padding: 16px; /* Horizontal padding (no vertical padding to maintain size) */
    height: 54px; /* Set the height to match the input field */
    line-height: 54px; /* Set line height to center the text vertically */
    font-size: 16px; /* Font size */
    width: 100%; /* Make the select width 100% */
    box-sizing: border-box; /* Include padding and border in width and height calculations */
  }

  .ant-select-arrow {
    color: ${textColor};
  }

  .ant-select-selection-item {
    line-height: normal; /* Reset line height for selected item */
  }

  .ant-select-dropdown {
    width: 100% !important; /* Ensure dropdown spans full width */
    box-sizing: border-box; /* Include padding and border in width and height calculations */
    position: absolute; /* Ensure dropdown is positioned relative to its parent */
  }

  .ant-select-dropdown-menu {
    background: ${widgetColor}; /* Match dropdown menu background */
    border: 1px solid ${inputBorderColor}; /* Match dropdown menu border */
  }

  .ant-select-dropdown-menu-item {
    white-space: nowrap; /* Prevent text from wrapping and affecting width */
  }
`;

// Styled DatePicker
export const StyledDatePicker = styled(AntDatePicker)`
  .ant-picker {
    background: ${widgetColor};
    border: 1px solid ${inputBorderColor};
    color: ${textColor};
    margin-bottom: 20px; /* Bottom margin */
    padding: 0 16px; /* Horizontal padding */
    height: 54px; /* Set height to match input and select fields */
    line-height: 54px; /* Set line height to center the text vertically */
    font-size: 16px; /* Font size */
    width: 100%; /* Make the date picker width 100% */
    box-sizing: border-box; /* Include padding and border in width and height calculations */
    display: flex; /* Flexbox to align items */
    align-items: center; /* Center items vertically */
  }

  .ant-picker-panel {
    background: ${widgetColor};
    border-color: ${inputBorderColor};
  }
`;



export default StyledTable;
