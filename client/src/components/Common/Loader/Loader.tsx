import styles from '../../Content/Content.module.css';
import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

export const Loader = () => {
    return (
        <div className={styles.content}>
            <GridLoader
                color={'#19535f'}
                loading={true}
                css={
                    {
                        position: 'absolute',
                        top: '45%',
                        left: '45%',
                    } as any
                }
                size={15}
            />
        </div>
    );
};
