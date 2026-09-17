import { useEffect, useRef, useState } from "react";

const debounceTime = 100;
let debounceId = 0;

export default function SearchHandler() {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState({ query: "" });

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (!visible) {
          setVisible(true);
        } else {
          if (document.activeElement && document.activeElement == searchRef.current) {
            setVisible(false);
            setQuery({ query: "" });
          } else {
            const currentSelection = window.getSelection()?.toString();
            if (currentSelection && currentSelection.length > 0) {
              if (searchRef.current) {
                setQuery({ query: currentSelection });
                searchRef.current.value = currentSelection;
                searchRef.current.focus();
                searchRef.current.select();
              }
            } else {
              searchRef.current?.focus();
              searchRef.current?.select();
            }
          }
        }
      }
    }

    window.addEventListener('keydown', listener, true);

    return () => {
      window.removeEventListener('keydown', listener, true);
    };
  }, [visible]);

  useEffect(() => {
    if (visible && searchRef.current) {
      searchRef.current.focus();
    }
  }, [visible]);

  function setQueryDebounced(newQuery: string) {
    if (debounceId) {
      clearTimeout(debounceId);
    }

    debounceId = setTimeout(() => {
      setQuery({ query: newQuery || "" });
    }, debounceTime);
  }

  const [matchingActions, setMatchingActions] = useState([] as Element[]);
  const [currentActionIndex, setCurrentActionIndex] = useState(-1);

  function getMatchingActions() {
    const newMatchingActions: Element[] = [];
    const allActions = document.querySelectorAll(".action-container");
    allActions.forEach(actionContainer => {
      if (actionContainer.checkVisibility()) {
        const regex = new RegExp(query.query, 'i');
        if (query.query != "" && regex.test(actionContainer.textContent)) {
          newMatchingActions.unshift(actionContainer);
        }
      }
    });
    return newMatchingActions;
  }

  useEffect(() => {
    // clear any old search data
    matchingActions.forEach(actionContainer => {
      actionContainer.className = "action-container";
    });
    const newMatchingActions = getMatchingActions();

    if (newMatchingActions.length > 0) {
      const firstInOrBelowViewIndex = newMatchingActions.findIndex(container => {
        const rect = container.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 //&&
          //rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
          //rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
      });

      newMatchingActions.forEach((container, index) => {
        if (firstInOrBelowViewIndex == index) {
          container.classList = "action-container highlighted selected";
          setCurrentActionIndex(index);
        } else {
          container.classList = "action-container highlighted";
        }
      });
    }

    setMatchingActions(newMatchingActions);
  }, [query]);

  useEffect(() => {
    if (currentActionIndex >= 0 && matchingActions.length) {
      const matchingAction = matchingActions[currentActionIndex];
      if (matchingAction) {
        if (document.body.contains(matchingAction)) {
          matchingAction.scrollIntoView({
            "block": "nearest",
          });
          matchingActions.forEach(action => {
            action.className = "action-container highlighted";
          });
          matchingAction.className = "action-container highlighted selected";
        } else {
          setQuery({ query: query.query });
        }
      }
    }
  }, [currentActionIndex, matchingActions]);

  function selectNext() {
    if (matchingActions.length) {
      const newIndex = (currentActionIndex + 1) % matchingActions.length;
      setCurrentActionIndex(newIndex);
    }
  }

  function selectPrevious() {
    if (matchingActions.length) {
      const newIndex = (currentActionIndex - 1) < 0 ? matchingActions.length - 1 : currentActionIndex - 1;
      setCurrentActionIndex(newIndex);
    }
  }

  return (
    <>
      {visible ?
        <div id="custom-search-container">
          <div className="search-icon">🔎︎</div>
          <input
            id="custom-search-input"
            ref={searchRef}
            type="search"
            onInput={(e) => setQueryDebounced(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (matchingActions.some(a => !document.body.contains(a)) || getMatchingActions().length != matchingActions.length) {
                  setQueryDebounced(query.query);
                } else {
                  if (e.shiftKey) {
                    selectPrevious();
                  } else {
                    selectNext();
                  }
                }
              } else if (e.key == "Escape") {
                if (searchRef.current && searchRef.current.value == "") {
                  setVisible(false);
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            }}
          />
          <div id="custom-search-result">
            {matchingActions.length > 0 ?
              <>{currentActionIndex + 1} of {matchingActions.length}</> :
              <></>
            }
          </div>
          <div className="button-container">
            <div className="button" onClick={() => selectPrevious()}>⮝</div>
            <div className="button" onClick={() => selectNext()}>⮟</div>
            <div className="button" onClick={() => { setVisible(false); setQuery({ query: "" }); }}>X</div>
          </div>
        </div> :
        <>
        </>
      }
    </>
  );
}