import React from 'react';
import { Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { ContentCut as CutIcon, ContentCopy as CopyIcon, ContentPaste as PasteIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface MoreOptionsMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const MoreOptionsMenu: React.FC<MoreOptionsMenuProps> = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <CutIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Cut</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <CopyIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Copy</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PasteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Paste</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Delete</Typography>
      </MenuItem>
    </Menu>
  );
};

export default MoreOptionsMenu;
