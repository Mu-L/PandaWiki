'use client';

import React from 'react';
import { styled, Grid, Box, Button, alpha } from '@mui/material';
import {
  StyledTopicBox,
  StyledTopicTitle,
  StyledEllipsis,
  StyledTopicInner,
  StyledTopicContainer,
} from '../component/styledCommon';
import { IconWenjianjia, IconWenjian } from '@panda-wiki/icons';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useFadeInText, useCardAnimation } from '../hooks/useGsapAnimation';
interface DirDocProps {
  mobile?: boolean;
  title?: string;
  bgColor?: string;
  titleColor?: string;
  items?: {
    id: string;
    name: string;
    emoji?: string;
    recommend_nodes: {
      id: string;
      name: string;
      emoji?: string;
      position?: number;
    }[];
  }[];
  baseUrl?: string;
}

const StyledDirDocItem = styled('div')(({ theme }) => ({
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
    boxShadow: '0px 10px 20px 0px rgba(0,0,5,0.2)',
    borderColor: theme.palette.primary.main,
  },
  width: '100%',
  opacity: 0,
}));

const StyledDirDocItemTitle = styled('h3')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.primary,
  gap: theme.spacing(1),
  fontSize: 20,
  fontWeight: 700,
  width: '100%',
}));

const StyledDirDocItemFiles = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 0 auto',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  fontSize: 14,
  fontWeight: 400,
  height: 129,
  width: '100%',
  lineHeight: 1.5,
}));

const StyledDirDocItemFile = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
  cursor: 'pointer',
  color: '#717572',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

// 单个卡片组件，带动画效果
const DirDocItem: React.FC<{
  item: any;
  index: number;
  baseUrl: string;
  size: any;
}> = React.memo(({ item, index, baseUrl, size }) => {
  const cardRef = useCardAnimation(0.2 + index * 0.1, 0.1);

  return (
    <Grid size={size} key={index}>
      <StyledDirDocItem ref={cardRef as React.Ref<HTMLDivElement>}>
        <StyledDirDocItemTitle>
          {item.emoji ? (
            <Box>{item.emoji}</Box>
          ) : (
            <IconWenjianjia sx={{ fontSize: 16, flexShrink: 0 }} />
          )}
          <StyledEllipsis>{item.name}</StyledEllipsis>
        </StyledDirDocItemTitle>
        <StyledDirDocItemFiles>
          {item.recommend_nodes.slice(0, 4).map((it: any) => (
            <StyledDirDocItemFile
              key={it.id}
              href={`${baseUrl}/node/${it.id}`}
              target='_blank'
            >
              {it.emoji ? (
                <Box>{it.emoji}</Box>
              ) : (
                <IconWenjian sx={{ fontSize: 14, flexShrink: 0 }} />
              )}
              <StyledEllipsis>{it.name}</StyledEllipsis>
            </StyledDirDocItemFile>
          ))}
        </StyledDirDocItemFiles>
        <Button
          href={`${baseUrl}/node/${item.recommend_nodes[0]?.id}`}
          target='_blank'
          sx={{ gap: 1, alignSelf: 'flex-end' }}
          variant='text'
          color='primary'
        >
          查看更多
        </Button>
      </StyledDirDocItem>
    </Grid>
  );
});

const DirDoc: React.FC<DirDocProps> = React.memo(
  ({
    title = '文档目录卡片',
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
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {items.map((item, index) => (
            <DirDocItem
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

export default React.memo(DirDoc);
