import clsx from 'clsx';
import {useState, useRef, memo} from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import {useAppSelector} from '@/hooks/use-app-selector';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {setActiveSort} from '@/store/app/app';
import {getActiveSort} from '@/store/app/selectors';
import {SORT_OPTIONS} from '@/constants';

function OffersListSortComponent() {
  const options = Object.keys(SORT_OPTIONS);
  const dispatch = useAppDispatch();

  const activeSort = useAppSelector(getActiveSort);
  const ref = useRef(null);
  const [sortOpened, setSortOpened] = useState(false);
  const pageClass = clsx('places__options places__options--custom', sortOpened && 'places__options--opened');

  const toggleSort = () => {
    setSortOpened((prevValue) => !prevValue);
  };

  const handleSortChange = (option: string) => {
    dispatch(setActiveSort(option));
    setSortOpened(false);
  };

  useOnClickOutside(ref, () => {
    setSortOpened(false);
  });

  return (
    <form className="places__sorting" ref={ref}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSort}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={pageClass}>
        {
          options.map((option) => {
            const optionsClass = clsx('places__option', option === activeSort && 'places__option--active');
            return (
              <li
                key={option}
                className={optionsClass}
                tabIndex={0}
                onClick={() => handleSortChange(option)}
              >
                {option}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}

const OffersListSort = memo(OffersListSortComponent);

export default OffersListSort;
