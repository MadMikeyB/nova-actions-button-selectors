<?php

namespace Lednerb\ActionButtonSelector;

trait ShowAsButton
{
    /**
     * ShowAsButton constructor.
     */
    public function __construct(...$parameters)
    {
        if (method_exists(parent::class, '__construct')) {
            parent::__construct(...$parameters);
        }

        return $this->showAsButton();
    }

    public function showAsButton($show = true)
    {
        return $this->withMeta(['showAsButton' => $show]);
    }

    public function cssClass(?string $cssClass = null)
    {
        return $this->withMeta(['cssClass' => $cssClass]);
    }

    public function cssStyle(?string $cssStyle = null)
    {
        return $this->withMeta(['cssStyle' => $cssStyle]);
    }
}
