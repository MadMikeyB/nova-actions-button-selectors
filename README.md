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
Actions\ToggleBanAction::make()
    ->showAsButton(true)
    ->buttonText('Ban User')
    ->cssClass('bg-red-500')
    ->cssStyle('background-color: red;')
```

`cssClass()` appends classes to the package defaults (it does not replace them). Use `cssStyle()` or stronger utility classes to override the default appearance when needed.
`buttonText()` overrides the visible button label (and button title attribute) while dropdown entries continue to use the action name.
