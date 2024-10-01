import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Define the type for a single rule
interface Rule {
  text: string;
  met: boolean;
}

// Define the props for RuleList component
interface RuleListProps {
  rules: Rule[];
}

export const RuleList = (props: RuleListProps)  => {
  const { rules } = props
  return (
    <List>
      {rules.map((rule, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            {rule.met ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
          </ListItemIcon>
          <ListItemText primary={rule.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default RuleList;
