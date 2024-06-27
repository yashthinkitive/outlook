import React, { useState } from 'react';
import { Box, Typography, MenuItem, Select,FormControl } from '@mui/material';
import { FaSortAmountDown, FaSortAmountUp, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Matter } from '../types';
import "./TabsComponent.css";

interface TabsComponentProps {
  matters: Matter[];
  sortOption: string;
  onSortChange: (value: string) => void;
  onSortDirectionChange: () => void;
  sortDirection: 'asc' | 'desc';
  tabLabels?: string[];
  isMattersCard?: boolean;
}

const NextArrow = (props: any) => {
  const { className, style, onClick, currentSlide, slideCount, slidesToShow } = props;

  const lastVisibleSlideIndex = slideCount - slidesToShow;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: currentSlide >= lastVisibleSlideIndex ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: -6,
        width: 30,
        height: 26,
        backgroundColor: '#fafafa',
        textAlign: 'center',
        borderRadius: '50%',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        zIndex: 1
      }}
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
}

const PrevArrow = (props: any) => {
  const { className, style, onClick, currentSlide } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: currentSlide === 0 ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        left: -6,
        width: 30,
        height: 26,
        backgroundColor: '#fafafa',
        borderRadius: '50%',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        zIndex: 1
      }}
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
}

const TabsComponent: React.FC<TabsComponentProps> = ({ matters, sortOption, onSortChange, onSortDirectionChange, sortDirection, tabLabels, isMattersCard }) => {
  const [value, setValue] = useState(0);

  const handleChange = (index: number) => {
    setValue(index);
  };

  const defaultTabLabels = [
    "Default Tab 1",
    "Default Tab 2",
    "Default Tab 3"
  ];

  const effectiveTabLabels = tabLabels || defaultTabLabels;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 350,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: value,
    afterChange: handleChange,
    nextArrow: <NextArrow slidesToShow={2} />,
    prevArrow: <PrevArrow />
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'white', p: 0, marginTop: -0.5 }}>
      <Box sx={{ width: '100%', height: '50%' }}>
        <Slider {...sliderSettings} className="custom-slider">
          {effectiveTabLabels.map((label, index) => (
            <div key={index} onClick={() => handleChange(index)}>
              <Box sx={{
                borderRadius: "200px", textAlign: "center", fontSize: 10, padding: '6px', width: '160px', cursor: 'pointer',
                backgroundColor: value === index ? 'white' : '#0052CC', color: value === index ? 'black' : 'white'
              }}>
                {label}
              </Box>
            </div>
          ))}
        </Slider>
      </Box>

      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 15, color: "grey", marginRight: "20px", marginLeft: '6px' }} variant="h6">{matters.length} Matters</Typography>

        <div onClick={onSortDirectionChange} style={{ position: 'relative', left: isMattersCard ? 248 : 236, top: -5, color: "#0052CC", cursor: 'pointer' }}>
          {sortDirection === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </div>

        <Box display="flex" alignItems="center">
          <Typography sx={{ fontSize: 15, color: "grey" }} variant="h6">Sort By: </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              sx={{
                color: "grey",
                height: 22,
                padding: 0,
                border: 'none',
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  color: "#0052CC"
                },
                "& .MuiSvgIcon-root": {
                  color: "grey",
                },
                "&:hover .MuiSvgIcon-root": {
                  color: "#0052CC",
                }
              }}
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <MenuItem value="matter" sx={{ color: sortOption === "matter" ? "grey" : "grey" }}>Matter</MenuItem>
              <MenuItem value="time" sx={{ color: sortOption === "time" ? "grey" : "grey" }}>Time</MenuItem>
              <MenuItem value="modified" sx={{ color: sortOption === "modified" ? "grey" : "grey" }}>Modified On</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default TabsComponent;
