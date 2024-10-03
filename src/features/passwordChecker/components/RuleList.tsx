import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { appTheme } from '../../../theme/style'; // Adjusted path to your style

interface Rule {
  text: string;
  met: boolean;
}

interface RuleListProps {
  rules: Rule[];
}

const RuleList: React.FC<RuleListProps> = ({ rules }) => {
  const theme = useTheme(); // Use the theme for dynamic styling

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '600px', // Limit the width if necessary
        backgroundColor: appTheme.colors.background, // Set background color from theme
        padding: theme.spacing(2), // Use theme spacing
        borderRadius: theme.shape.borderRadius, // Rounded corners using theme
      }}
    >
      {rules.map((rule, index) => (
        <ListItem
          key={index}
          sx={{
            backgroundColor: rule.met ? theme.palette.success.light : theme.palette.error.light, // Use theme colors for success and error
            borderRadius: theme.shape.borderRadius, // Round the rule item corners
            marginBottom: theme.spacing(1), // Space between rules
            padding: theme.spacing(2), // Add padding to each item
            boxShadow: theme.shadows[1], // Subtle shadow effect from theme
          }}
        >
          <ListItemIcon>
            {rule.met ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
          </ListItemIcon>
          <ListItemText
            primary={rule.text}
            primaryTypographyProps={{
              variant: 'body1',
              sx: {
                color: theme.palette.text.primary, // Use theme text color
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RuleList;
