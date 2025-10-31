'use client';

import React from 'react';
import { styled, Grid, Box, Button, alpha } from '@mui/material';
import { StyledTopicBox, StyledTopicTitle } from '../component/styledCommon';
import IconWenjian from '@panda-wiki/icons/IconWenjian';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useFadeInText, useCardAnimation } from '../hooks/useGsapAnimation';

interface BasicDocProps {
  mobile?: boolean;
  title?: string;
  bgColor?: string;
  titleColor?: string;
  items?: {
    id: string;
    name: string;
    summary: string;
    emoji?: string;
  }[];
  baseUrl?: string;
}

const StyledBasicDocItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(3.5, 2.5, 2),
  borderRadius: '8px',
  boxShadow: `0px 5px 20px 0px ${alpha(theme.palette.text.primary, 0.06)}`,
  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0px 10px 20px 0px ${alpha(theme.palette.text.primary, 0.1)}`,
    borderColor: theme.palette.primary.main,
  },
  width: '100%',
  cursor: 'pointer',
}));

const StyledBasicDocItemTitle = styled('h3')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: 20,
  fontWeight: 700,
  color: theme.palette.text.primary,
  width: '100%',
}));
const StyledBasicDocItemName = styled('span')(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  minWidth: 0,
}));

const StyledBasicDocItemSummary = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 4,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  flex: '1 0 auto',
  fontSize: 14,
  fontWeight: 400,
  height: 80,
  color: alpha(theme.palette.text.primary, 0.5),
}));

// 单个卡片组件，带动画效果
const BasicDocItem: React.FC<{
  item: any;
  index: number;
  baseUrl: string;
  size: any;
}> = React.memo(({ item, index, baseUrl, size }) => {
  const cardRef = useCardAnimation(0.2 + index * 0.1, 0.1);

  return (
    <Grid size={size} key={index}>
      <StyledBasicDocItem ref={cardRef as React.Ref<HTMLDivElement>}>
        <StyledBasicDocItemTitle>
          {item.emoji ? (
            <Box>{item.emoji}</Box>
          ) : (
            <IconWenjian sx={{ fontSize: 16, flexShrink: 0 }} />
          )}
          <StyledBasicDocItemName>{item.name}</StyledBasicDocItemName>
        </StyledBasicDocItemTitle>
        <StyledBasicDocItemSummary>{item.summary}</StyledBasicDocItemSummary>
        <Box
          sx={{
            color: 'primary.main',
            fontSize: 14,
            fontWeight: 400,
            alignSelf: 'flex-end',
          }}
        >
          查看更多
        </Box>
      </StyledBasicDocItem>
    </Grid>
  );
});

const BasicDoc: React.FC<BasicDocProps> = React.memo(
  ({ title, items = [], mobile, baseUrl = '', bgColor, titleColor }) => {
    const size =
      typeof mobile === 'boolean' ? (mobile ? 12 : 4) : { xs: 12, md: 4 };

    // 添加标题淡入动画
    const titleRef = useFadeInText(0.2, 0.1);

    return (
      <StyledTopicBox>
        <StyledTopicTitle ref={titleRef}>{title}</StyledTopicTitle>
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {items.map((item, index) => (
            <BasicDocItem
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

export default BasicDoc;
