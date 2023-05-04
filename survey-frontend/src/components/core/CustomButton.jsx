import {Link} from "react-router-dom";

export default function CustomButton({
                                       color = 'blue',
                                       to = '',
                                       link = false,
                                       circle = false,
                                       type = 'button',
                                       target = '_self',
                                       handleClick = () => {
                                       },
                                       children
                                     }) {
  // button styling classes
  let styles = ['my-2', 'whitespace-nowrap', 'border-2', 'border-transparent', 'focus:ring-2', 'focus:ring-offset-1', 'shadow', 'flex flex-row gap-2 justify-around items-center','hover:shadow-md']

  if (link) {
    // generate styles based on the color
    switch (color) {
      case "blue":
        styles = [...styles, `text-blue-500`, `focus:ring-blue-400`];
        break
      case "red":
        styles = [...styles, `text-red-500`, `focus:ring-red-400`];
        break
      case "gray":
        styles = [...styles, `text-gray-500`, `focus:ring-gray-400`];
        break
    }
  }

  if (circle) {
    styles = [...styles, 'items-center', 'justify-center', 'rounded-full','p-2']
    // generate styles based on the color
    switch (color) {
      case "blue":
        styles = [...styles, `text-blue-500`,];
        break
      case "red":
        styles = [...styles, `text-red-500`,];
        break
      case "gray":
        styles = [...styles, `text-gray-500`,];
        break
    }
  } else {
    styles = [...styles, 'px-3', 'py-2', 'rounded-md', 'text-white']

    // generate styles based on the color
    switch (color) {
      case "blue":
        styles = [...styles, `bg-blue-400`,];
        break
      case "red":
        styles = [...styles, `bg-error`,];
        break
      case "gray":
        styles = [...styles, `bg-neutral`,];
        break
    }
  }

  return (<>
    {link && <Link to={to} className={styles.join(' ')} onClick={() => handleClick()} target={target}>{children}</Link>}
    {!link && <button type={type} className={styles.join(' ')} onClick={() => handleClick()}>{children}</button>}
  </>);
}
