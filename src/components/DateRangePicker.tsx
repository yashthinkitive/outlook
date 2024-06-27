import React, { useState, useEffect } from 'react';
import { DateRange, Range } from 'react-date-range';
import { Box, Button, TextField, Typography, Chip, InputAdornment } from '@mui/material';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns'; 

interface DateRangePickerProps {
  onApply: (range: { startDate: Date; endDate: Date }) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({ onApply }) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [displayDateRange, setDisplayDateRange] = useState<string>(''); 

  const formatDateRange = (startDate: Date, endDate: Date) => {
    return `${format(startDate, 'MM/dd/yyyy')} – ${format(endDate, 'MM/dd/yyyy')}`;
  };

  useEffect(() => {
    const { startDate, endDate } = state[0];
    if (startDate && endDate) {
      setDisplayDateRange(formatDateRange(startDate, endDate));
    }
  }, [state]);

  const handleApply = () => {
    const { startDate, endDate } = state[0];
    onApply({
      startDate: startDate || new Date(),
      endDate: endDate || new Date()
    });
    setOpenPicker(false);
  };

  const handleClear = () => {
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
    setDisplayDateRange(''); 
  };

  const togglePicker = () => {
    setOpenPicker(!openPicker);
  };

  return (
    <Box sx={{ width: '100%', padding: 1, backgroundColor: '', borderRadius: 2 }}>
      <Typography variant="h6" component="h2" sx={{ color: "grey", fontSize: 12 }}>
        Date Filter:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Chip
          sx={{ height: 28 }}
          label="Created Date"
          color="primary"
        />
        <Chip
          sx={{ position: 'relative', left: 20, height: 28 }}
          label="Modified Date"
          color="primary"
        />
      </Box>
      <TextField
        sx={{
          marginBottom: '10px',
          width: '100%',
          '& .MuiInputBase-root': {
            height: '36px',
            background: '#FAFBFC 0% 0% no-repeat padding-box',
            color: 'grey',
            borderRadius: '0px',
            opacity: 1,
            '&::placeholder': {
              color: 'grey'
            }
          },
          '& .MuiInputLabel-root': {
            color: 'grey'
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'grey',
            background: '#FAFBFC 0% 0% no-repeat padding-box',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            opacity: 1,
            padding: '6px'
          }
        }}
        variant="outlined"
        placeholder="MM/DD/YYYY – MM/DD/YYYY"
        value={displayDateRange} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CalendarTodayIcon sx={{ color: 'grey', cursor: 'pointer' }} onClick={togglePicker} />
            </InputAdornment>
          )
        }}
      />
      {openPicker && (
        <Box sx={{ marginTop: 0 }}>
          <DateRange
            ranges={state}
            onChange={(item) => setState([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            rangeColors={['#3f51b5']}
          />
        </Box>
      )}
      <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClear} sx={{ textTransform:'initial',height: '23px', color: 'grey'}}>
          Clear
        </Button>
        <Button onClick={handleApply} variant="contained" color="primary" sx={{ textTransform:'initial', height: '25px', marginLeft: '20px' }}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default DateRangePickerComponent;
