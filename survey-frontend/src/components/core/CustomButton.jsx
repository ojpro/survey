import {Link} from "react-router-dom";

export default function CustomButton({
                                       color = 'blue',
                                       to = '',
                                       link = false,
                                       circle = false,
                                       handleClick = () => {
                                       },
                                       children
                                     }) {
  // button styling classes
  let styles = [
    'my-2',
    'whitespace-nowrap',
    'border-2',
    'border-transparent',
    'focus:ring-2',
    'focus:ring-offset-1',
    'flex flex-row gap-2 justify-around',
  ]

  if (link) {
    styles = [
      ...styles,
      'bg-transparent',
    ]

    // generate styles based on the color
    switch (color) {
      case "blue":
        styles = [
          ...styles,
          `text-blue-500`,
          `focus:ring-blue-400`
        ];
        break
      case "red":
        styles = [
          ...styles,
          `text-red-500`,
          `focus:ring-red-400`
        ];
        break
      case "gray":
        styles = [
          ...styles,
          `text-gray-500`,
          `focus:ring-gray-400`
        ];
        break
    }
  } else {
    styles = [
      ...styles,
      'text-white',
    ]
  }

  if (circle) {
    styles = [
      ...styles,
      'w-8',
      'h-8',
      'items-center',
      'justify-center',
      'rounded-full',
    ]
    // generate styles based on the color
    switch (color) {
      case "blue":
        styles = [
          ...styles,
          `text-blue-500`,
        ];
        break
      case "red":
        styles = [
          ...styles,
          `text-red-500`,
        ];
        break
      case "gray":
        styles = [
          ...styles,
          `text-gray-500`,
        ];
        break
    }
  } else {
    styles = [
      ...styles,
      'px-2.5',
      'py-1',
      'rounded-md'
    ]

    // generate styles based on the color
    switch (color) {
      case "blue":
        styles = [
          ...styles,
          `bg-blue-500`,
        ];
        break
      case "red":
        styles = [
          ...styles,
          `bg-red-500`,
        ];
        break
      case "gray":
        styles = [
          ...styles,
          `bg-gray-500`,
        ];
        break
    }
  }

  return (
    <>
      {link && <Link to={to} className={styles.join(' ')} onClick={() => handleClick()}>{children}</Link>}
      {!link && <button className={styles.join(' ')} onClick={() => handleClick()}>{children}</button>}
    </>
  );
}
