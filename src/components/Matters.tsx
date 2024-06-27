import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import TabsComponent from './TabsComponent';
import CardComponent from './CardComponent';
import { mattersData } from '../data';
import { Matter } from '../types';
import DateRangePickerComponent from './DateRangePicker';
import styles from './MattersCard.module.css';

const Matters: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filteredMatters, setFilteredMatters] = useState<Matter[]>(mattersData);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date } | null>(null);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortOption, sortDirection, dateRange]);

  const applyFilters = () => {
    let filteredMatters = mattersData.filter((matter: Matter) =>
      matter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      matter.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (dateRange) {
      filteredMatters = filteredMatters.filter(matter => {
        const matterDate = new Date(matter.time);
        return matterDate >= dateRange.startDate && matterDate <= dateRange.endDate;
      });
    }

    filteredMatters.sort((a, b) => {
      if (sortOption === 'matter') {
        return sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      } else if (sortOption === 'modified') {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortOption === 'time') {
        return sortDirection === 'asc' ? a.modifiedBy.localeCompare(b.modifiedBy) : b.modifiedBy.localeCompare(a.modifiedBy);
      }
      return 0;
    });

    setFilteredMatters(filteredMatters);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleTuneClick = () => {
    setShowDateRangePicker(prev => !prev); 
  };

  const handleDateRangeApply = (range: { startDate: Date; endDate: Date }) => {
    setDateRange(range);
    setShowDateRangePicker(false);
  };

  const tabLabels = [
    "Recently Viewed",
    "All Matters",
    "My Assigned",
    "My Open Matters",
    "Open Matters"
  ];

  return (
    <div>
      <Grid container sx={{ marginTop: 1 }}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Matter Title or ID"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '32px',
                padding: 0,
              },
              '& .MuiInputBase-input': {
                height: '32px',
                padding: '0 14px',
                fontSize: '0.875rem',
                lineHeight: '32px',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'grey',
                opacity: 1,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            sx={{
              marginLeft: '332px',
              marginTop:'-55px',
              color: '#0052CC',
              '&:hover': {
                backgroundColor: '#bbdefb',
                borderRadius: '2%',
              },
              height: 20,
              width: 28,
            }}
            onClick={handleTuneClick}
          >
            <TuneIcon />
          </IconButton>

          {showDateRangePicker && (
            <Box sx={{ marginTop: -2, width: '100%' }}>
              <DateRangePickerComponent onApply={handleDateRangeApply} />
            </Box>
          )}
        </Grid>
      </Grid>
      <TabsComponent
        matters={filteredMatters}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onSortDirectionChange={handleSortDirectionChange}
        sortDirection={sortDirection}
        tabLabels={tabLabels}
        isMattersCard={true}
      />
      <div style={{ marginTop: '6px' }}>
        {filteredMatters.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
            No matters match the selected criteria.
          </Typography>
        ) : (
          filteredMatters.map(matter => (
            <CardComponent
              key={matter.id}
              id={matter.id}
              title={matter.title}
              modifiedBy={matter.modifiedBy}
              time={matter.time}
              query={searchQuery}
              showDetails={true}
              className={styles.mattersCard}
              titleClassName={styles.mattersTitle}
              type="matter"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Matters;
