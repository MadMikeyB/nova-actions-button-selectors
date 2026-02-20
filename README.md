# Laravel Nova action button selector

[![Packagist Version](https://img.shields.io/packagist/v/lednerb/nova-action-button-selectors.svg?style=for-the-badge)](https://packagist.org/packages/lednerb/nova-action-button-selectors)
[![Packagist Downloads](https://img.shields.io/packagist/dt/lednerb/nova-action-button-selectors.svg?style=for-the-badge)](https://packagist.org/packages/lednerb/nova-action-button-selectors)
[![Codeberg](https://img.shields.io/badge/Codeberg-2185D0?style=for-the-badge&logo=Codeberg&logoColor=white)](https://codeberg.org/Lednerb/nova-action-button-selector)

## Status

For **Laravel Nova 5**, inline action buttons are now built in via Nova (`->showInline()`).

This package is now best considered **legacy/optional** for Nova 5 projects. Keep it only if you want its extra button customization API (`->showAsButton()`, `->buttonText()`, `->cssClass()`, `->cssStyle()`).

## Requirements

- `php: ^8.1`
- `laravel/nova: ^4 || ^5`

## Install

```bash
composer require lednerb/nova-action-button-selectors
```

Detail page
![example_1](./docs/main_1.jpg)

Index page with inline action
![example_2](./docs/main_2.jpg)

## Usage

Use the trait in your action class:

```php
use Lednerb\ActionButtonSelector\ShowAsButton;

class ToggleBanAction extends Action
{
    use InteractsWithQueue, Queueable;
    use ShowAsButton;
}
```

Configure actions in your resource:

```php
public function actions(NovaRequest $request)
{
    return [
        ToggleBanAction::make()
            ->showInline()
            ->showAsButton(true)
            ->buttonText('Ban User')
            ->cssClass('bg-red-500')
            ->cssStyle('background-color: red;'),
    ];
}
```

| Method | Behavior |
| --- | --- |
| `cssClass()` | Appends classes to the package defaults (does not replace them). |
| `cssStyle()` | Adds inline styles directly to the button element. Useful for targeted visual overrides. |
| `buttonText()` | Overrides the visible button label and button `title` attribute. Dropdown entries continue using the action name. |

Action visibility is controlled by Nova. This package renders the actions Nova provides for the current context.

For resource index rows, Nova only includes actions marked as inline (for example via `->showInline()`). If an action is not inline, it will not render as an index row button.

## Nova 5 recommendation

If you do not need custom button text/styles, prefer native Nova behavior and remove this package.

Minimal native Nova 5 example:

```php
public function actions(NovaRequest $request)
{
    return [
        ToggleBanAction::make()
            ->showInline()
            ->onlyOnIndex(),
    ];
}
```

Migration steps:

1. Remove `ShowAsButton` trait usage from actions.
2. Remove calls to `->showAsButton()`, `->buttonText()`, `->cssClass()`, `->cssStyle()`.
3. Use Nova-native action visibility APIs (`->showInline()`, `->onlyOnIndex()`, etc.).
4. Remove the package from your app when no longer needed.
