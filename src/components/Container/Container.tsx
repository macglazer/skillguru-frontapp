// Libraries
import React, {useMemo} from 'react';
import classNames from 'classnames';
// Types
import {Tag} from '../../types/tags';
import {Common} from '../../types/main';
// styles
import styles  from './Container.module.scss'

interface ContainerProps extends Common {
	as: Tag;
	fluid?: boolean;
}

const Container = (props: ContainerProps) => {
	const {as = Tag.Div, fluid, classes, children, id} = props;

	const ElementTag = useMemo(() => as, [as]);

	return (
		<ElementTag className={classes} id={id}>
			<div className={classNames(styles.container, 'container')} data-type={fluid ? 'fluid' : 'default'}>
				{children}
			</div>
		</ElementTag>
	);
};

export default Container;
