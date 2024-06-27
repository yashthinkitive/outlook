import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import TabsComponent from './TabsComponent';
import CardComponent from './CardComponent';
import { mattersData } from '../data';
import { Matter } from '../types';
import DateRangePickerComponent from './DateRangePicker';
import { FaFilePdf, FaFileWord, FaFileExcel } from 'react-icons/fa'; 

const fileIcons: { [key: string]: React.ReactNode } = {
  pdf: <FaFilePdf style={{ color: '#0052CC', marginRight: 8 }} />,
  doc: <FaFileWord style={{ color: '#0052CC', marginRight: 8 }} />,
  xls: <FaFileExcel style={{ color: '#0052CC', marginRight: 8 }} />,
};

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filteredDocuments, setFilteredDocuments] = useState<Matter[]>(mattersData);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date } | null>(null);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortOption, sortDirection, dateRange]);

  const applyFilters = () => {
    let filteredDocs = mattersData.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (dateRange) {
      filteredDocs = filteredDocs.filter(doc => {
        const docDate = new Date(doc.time); 
        return docDate >= dateRange.startDate && docDate <= dateRange.endDate;
      });
    }

    filteredDocs.sort((a, b) => {
      if (sortOption === "matter") {
        return sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      } else if (sortOption === "modified") {
        const dateA = new Date(a.time); 
        const dateB = new Date(b.time); 
        return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortOption === "time") {
        return sortDirection === 'asc' ? a.modifiedBy.localeCompare(b.modifiedBy) : b.modifiedBy.localeCompare(a.modifiedBy);
      }
      return 0;
    });

    setFilteredDocuments(filteredDocs);
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
    "Recently Used",
    "Recently Modified",
    "Recently Uploaded",
    "Checkout",
    "My Documents",
  ];

  return (
    <div>
      <Grid container sx={{ marginTop: 2 }}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Document Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "32px",
                padding: 0,
              },
              "& .MuiInputBase-input": {
                height: "32px",
                padding: "0 14px",
                fontSize: "0.875rem",
                lineHeight: "32px",
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
              marginLeft: '320px',
              marginTop:'-55px',
              color: '#0052CC',
              '&:hover': {
                backgroundColor: '#bbdefb',
                borderRadius: "2%",
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
        matters={filteredDocuments} 
        sortOption={sortOption}
        onSortChange={setSortOption}
        onSortDirectionChange={handleSortDirectionChange}
        sortDirection={sortDirection}
        tabLabels={tabLabels}
      />
      <div style={{ marginTop: "6px", overflow: 'hidden' }}>
        {filteredDocuments.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
            No documents match the selected criteria.
          </Typography>
        ) : (
          filteredDocuments.map((doc) => (
            <CardComponent
              key={doc.id}
              id={doc.id}
              title={doc.title}
              modifiedBy={doc.modifiedBy}
              time={doc.time}
              query={searchQuery}
              fileName={doc.fileName}
              fileIcon={fileIcons[doc.extension]} 
              version={doc.version}
              showDetails={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;
