import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const RuleList = ({ rules }) => {
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
