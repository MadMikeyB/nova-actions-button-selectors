# Laravel Nova action button selector

[![Packagist Version](https://img.shields.io/packagist/v/lednerb/nova-action-button-selectors.svg?style=for-the-badge)](https://packagist.org/packages/lednerb/nova-action-button-selectors)
[![Packagist Downloads](https://img.shields.io/packagist/dt/lednerb/nova-action-button-selectors.svg?style=for-the-badge)](https://packagist.org/packages/lednerb/nova-action-button-selectors)
[![Codeberg](https://img.shields.io/badge/Codeberg-2185D0?style=for-the-badge&logo=Codeberg&logoColor=white)](https://codeberg.org/Lednerb/nova-action-button-selector)

This package allows you to add buttons for Nova actions on the detail page instead having them all within the dropdown menu.

This package is based on the original code from [`pitchayakit/nova-action-button-selector`](https://github.com/pitchayakit/nova-action-button-selector) but differs in usage:

Instead of automatically showing all actions as buttons, it allows you to add the `ShowAsButton` trait to the actions you want to display as buttons.
Also it fixes some styling issues.


## Requirements
- `php: ^8.1`
- `laravel/nova: ^4 || ^5`

## How to install
```
composer require lednerb/nova-action-button-selectors
```
Detail page
![example_1](./docs/main_1.jpg)

Index page with inline action
![example_2](./docs/main_2.jpg)


## Usage

In your Action class define the following trait:

```php
...
use Lednerb\ActionButtonSelector\ShowAsButton;

class MyAction extends Action
{
    use InteractsWithQueue, Queueable;
    use ShowAsButton;
    
    ...
```

If you want to hide the button on some Detail pages, use the following method in the Nova Model's `actions` array:

```php
...
 public function actions(NovaRequest $request)
    {
        return [
            MyCustomAction::make()
                ->onlyOnDetail()
                ->withoutConfirmation()
                ->showAsButton(false),

            ...
```

You can also customize the generated button with CSS classes and inline styles:

```php
...
 public function actions(NovaRequest $request)
    {
        return [
            MyCustomAction::make()
                ->showAsButton(true)
                ->cssClass('bg-red-500')
                ->cssStyle('background-color: red;')
            ...

```

You can also customize the generated button text instead of relying on the action name:

```php
...
 public function actions(NovaRequest $request)
    {
        return [
            MyCustomAction::make()
                ->showAsButton(true)
                ->buttonText('My Custom Action Button')
            ...
```

| Method | Behavior |
| --- | --- |
| `cssClass()` | Appends classes to the package defaults (does not replace them). |
| `cssStyle()` | Adds inline styles directly to the button element. Useful for targeted visual overrides. |
| `buttonText()` | Overrides the visible button label and button `title` attribute. Dropdown entries continue using the action name. |

Button rendering also respects Nova action visibility settings (such as `showOnIndex()`, `onlyOnDetail()`, `hideFromIndex()`, etc.) for the current context.
