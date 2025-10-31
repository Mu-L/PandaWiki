'use client';

import React from 'react';
import { styled, Grid, Box, alpha } from '@mui/material';
import {
  StyledTopicInner,
  StyledTopicContainer,
  StyledTopicBox,
  StyledTopicTitle,
  StyledEllipsis,
} from '../component/styledCommon';
import IconWenjian from '@panda-wiki/icons/IconWenjian';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useFadeInText, useCardAnimation } from '../hooks/useGsapAnimation';

interface SimpleDocProps {
  mobile?: boolean;
  title?: string;
  bgColor?: string;
  titleColor?: string;
  items?: {
    id: string;
    name: string;
    emoji?: string;
  }[];
  baseUrl?: string;
}

const StyledSimpleDocItem = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3.5, 2.5),
  borderRadius: '8px',
  boxShadow: `0px 5px 20px 0px ${alpha(theme.palette.text.primary, 0.06)}`,
  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  '&:hover': {
    transform: 'translateY(-5px)',
    color: theme.palette.primary.main,
    boxShadow: '0px 10px 20px 0px rgba(0,0,5,0.2)',
    borderColor: theme.palette.primary.main,
  },
  opacity: 0,
}));

const StyledSimpleDocItemTitle = styled('h3')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: 20,
  fontWeight: 700,
  width: '100%',
}));

// 单个卡片组件，带动画效果
const SimpleDocItem: React.FC<{
  item: any;
  index: number;
  baseUrl: string;
  size: any;
}> = React.memo(({ item, index, baseUrl, size }) => {
  const cardRef = useCardAnimation(0.2 + index * 0.1, 0.1);

  return (
    <Grid size={size} key={index}>
      <StyledSimpleDocItem
        ref={cardRef as React.Ref<HTMLAnchorElement>}
        href={`${baseUrl}/node/${item.id}`}
        target='_blank'
      >
        <StyledSimpleDocItemTitle>
          {item.emoji ? (
            <Box>{item.emoji}</Box>
          ) : (
            <IconWenjian sx={{ fontSize: 16, flexShrink: 0 }} />
          )}
          <StyledEllipsis sx={{ flex: 1 }}>{item.name}</StyledEllipsis>
          <ArrowForwardIosRoundedIcon
            sx={{ fontSize: 14, color: 'primary.main' }}
          />
        </StyledSimpleDocItemTitle>
      </StyledSimpleDocItem>
    </Grid>
  );
});

const SimpleDoc: React.FC<SimpleDocProps> = React.memo(
  ({
    title = '简易文档卡片',
    items = [],
    mobile,
    baseUrl = '',
    bgColor,
    titleColor,
  }) => {
    const size =
      typeof mobile === 'boolean' ? (mobile ? 12 : 4) : { xs: 12, md: 4 };

    // 添加标题淡入动画
    const titleRef = useFadeInText(0.2, 0.1);

    return (
      <StyledTopicBox>
        <StyledTopicTitle ref={titleRef}>{title}</StyledTopicTitle>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {items.map((item, index) => (
            <SimpleDocItem
              key={index}
              item={item}
              index={index}
              baseUrl={baseUrl}
              size={size}
            />
          ))}
        </Grid>
      </StyledTopicBox>
    );
  },
);

export default SimpleDoc;
