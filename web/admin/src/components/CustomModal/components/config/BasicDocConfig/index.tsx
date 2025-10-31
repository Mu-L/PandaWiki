import React, { useEffect, useState } from 'react';
import { CommonItem, StyledCommonWrapper } from '../../components/StyledCommon';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import BasicDocDragList from './DragList';
import type { ConfigProps } from '../type';
import { Empty } from '@ctzhian/ui';
import { useAppSelector } from '@/store';
import AddRecommendContent from '@/pages/setting/component/AddRecommendContent';
import { getApiV1NodeRecommendNodes } from '@/request/Node';
import useDebounceAppPreviewData from '@/hooks/useDebounceAppPreviewData';
import ColorPickerField from '../../components/ColorPickerField';
import { handleLandingConfigs, findConfigById } from '../../../utils';
import { DEFAULT_DATA } from '../../../constants';

const BasicDocConfig = ({ setIsEdit, id }: ConfigProps) => {
  const { kb_id } = useAppSelector(state => state.config);
  const { appPreviewData } = useAppSelector(state => state.config);
  const debouncedDispatch = useDebounceAppPreviewData();
  const { control, watch, setValue, subscribe, reset } = useForm<
    typeof DEFAULT_DATA.basic_doc
  >({
    defaultValues: findConfigById(
      appPreviewData?.settings?.web_app_landing_configs || [],
      id,
    ),
  });

  const nodes = watch('nodes') || [];
  const [open, setOpen] = useState(false);

  const nodeRec = (ids: string[]) => {
    getApiV1NodeRecommendNodes({ kb_id, node_ids: ids }).then(res => {
      setValue('nodes', res as []);
    });
  };

  const handleListChange = (newList: string[]) => {
    nodeRec(newList);
    setIsEdit(true);
  };

  useEffect(() => {
    reset(
      findConfigById(
        appPreviewData?.settings?.web_app_landing_configs || [],
        id,
      ),
      { keepDefaultValues: true },
    );
  }, [appPreviewData, id]);

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        const previewData = {
          ...appPreviewData,
          settings: {
            ...appPreviewData?.settings,
            web_app_landing_configs: handleLandingConfigs({
              id,
              config: appPreviewData?.settings?.web_app_landing_configs || [],
              values,
            }),
          },
        };
        setIsEdit(true);
        debouncedDispatch(previewData);
      },
    });
    return () => {
      callback();
    };
  }, [subscribe, appPreviewData, id]);

  return (
    <StyledCommonWrapper>
      <CommonItem title='标题'>
        <Controller
          control={control}
          name='title'
          render={({ field }) => (
            <TextField label='文字' {...field} placeholder='请输入' />
          )}
        />
        {/* <Controller
          control={control}
          name='title_color'
          render={({ field }) => (
            <ColorPickerField
              label='标题颜色'
              value={field.value}
              onChange={field.onChange}
              sx={{ flex: 1 }}
            />
          )}
        /> */}
      </CommonItem>
      {/* <CommonItem title='背景颜色'>
        <Controller
          control={control}
          name='bg_color'
          render={({ field }) => (
            <ColorPickerField
              value={field.value}
              onChange={field.onChange}
              sx={{ flex: 1 }}
            />
          )}
        />
      </CommonItem> */}
      <CommonItem title='推荐文档' onAdd={() => setOpen(true)}>
        {nodes.length === 0 ? (
          <Empty />
        ) : (
          <BasicDocDragList
            data={nodes}
            onChange={value => {
              setIsEdit(true);
              setValue('nodes', value);
            }}
            setIsEdit={setIsEdit}
          />
        )}
      </CommonItem>
      <AddRecommendContent
        open={open}
        selected={nodes.map(item => item.id!)}
        onChange={handleListChange}
        onClose={() => setOpen(false)}
        disabled={item => item.type === 1}
      />
    </StyledCommonWrapper>
  );
};

export default BasicDocConfig;
